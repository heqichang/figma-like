import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tokensDir = path.join(__dirname, '..', 'tokens')
const outputDir = path.join(__dirname, '..', 'dist', 'tokens')

const tokenLevels = ['global', 'alias', 'component']

function parseTokenObjects(content) {
  const tokens = []
  let i = 0
  
  const skipWhitespace = () => {
    while (i < content.length && /\s/.test(content[i])) i++
  }
  
  const parseString = () => {
    const quote = content[i]
    i++
    let str = ''
    while (i < content.length && content[i] !== quote) {
      if (content[i] === '\\') {
        str += content[i] + content[i + 1]
        i += 2
      } else {
        str += content[i]
        i++
      }
    }
    i++
    return str
  }
  
  const parseValue = () => {
    skipWhitespace()
    if (content[i] === "'" || content[i] === '"') {
      return parseString()
    }
    
    let value = ''
    let braceDepth = 0
    let inString = false
    let stringChar = ''
    
    while (i < content.length) {
      const char = content[i]
      
      if (!inString && (char === "'" || char === '"')) {
        inString = true
        stringChar = char
        value += char
        i++
        continue
      }
      
      if (inString) {
        value += char
        if (char === stringChar && content[i - 1] !== '\\') {
          inString = false
        }
        i++
        continue
      }
      
      if (char === '{') {
        braceDepth++
        value += char
        i++
        continue
      }
      
      if (char === '}') {
        if (braceDepth === 0) break
        braceDepth--
        value += char
        i++
        continue
      }
      
      if (char === ',' && braceDepth === 0) {
        break
      }
      
      value += char
      i++
    }
    
    value = value.trim()
    if (value === 'true') return true
    if (value === 'false') return false
    if (!isNaN(Number(value)) && value !== '') return Number(value)
    return value
  }
  
  const parseObject = () => {
    const obj = {}
    skipWhitespace()
    if (content[i] !== '{') return null
    i++
    
    while (i < content.length) {
      skipWhitespace()
      if (content[i] === '}') {
        i++
        break
      }
      
      let key
      if (content[i] === "'" || content[i] === '"') {
        key = parseString()
      } else {
        key = ''
        while (i < content.length && /[\w-]/.test(content[i])) {
          key += content[i]
          i++
        }
      }
      
      skipWhitespace()
      if (content[i] === ':') i++
      
      const value = parseValue()
      obj[key] = value
      
      skipWhitespace()
      if (content[i] === ',') i++
    }
    
    return obj
  }
  
  while (i < content.length) {
    skipWhitespace()
    if (content[i] === '{') {
      const obj = parseObject()
      if (obj && obj.name && obj.value !== undefined && obj.type && obj.level) {
        tokens.push(obj)
      }
    } else {
      i++
    }
  }
  
  return tokens
}

async function loadTokens() {
  const tokens = {}
  for (const level of tokenLevels) {
    const filePath = path.join(tokensDir, `${level}.ts`)
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8')
      tokens[level] = parseTokenObjects(content)
    }
  }
  return tokens
}

function resolveValue(value, tokens, visited = new Set()) {
  if (typeof value !== 'string') return value
  const match = value.match(/^\{([^}]+)\}$/)
  if (match) {
    const refName = match[1]
    if (visited.has(refName)) return value
    visited.add(refName)
    for (const level of tokenLevels) {
      const found = tokens[level]?.find(t => t.name === refName)
      if (found) {
        return resolveValue(found.value, tokens, visited)
      }
    }
  }
  return value
}

async function exportCSS(tokens) {
  let css = ':root {\n'
  for (const level of tokenLevels) {
    if (tokens[level]) {
      css += `\n  /* ${level.charAt(0).toUpperCase() + level.slice(1)} Tokens */\n`
      for (const token of tokens[level]) {
        const value = resolveValue(token.value, tokens)
        css += `  --${token.name}: ${value};\n`
      }
    }
  }
  css += '}\n'
  await fs.writeFile(path.join(outputDir, 'tokens.css'), css)
  console.log('✓ Exported tokens.css')
}

async function exportSCSS(tokens) {
  let scss = ''
  for (const level of tokenLevels) {
    if (tokens[level]) {
      scss += `// ${level.charAt(0).toUpperCase() + level.slice(1)} Tokens\n`
      for (const token of tokens[level]) {
        const value = resolveValue(token.value, tokens)
        scss += `$${token.name}: ${value};\n`
      }
      scss += '\n'
    }
  }
  await fs.writeFile(path.join(outputDir, 'tokens.scss'), scss)
  console.log('✓ Exported tokens.scss')
}

async function exportJSON(tokens) {
  const jsonOutput = {}
  for (const level of tokenLevels) {
    if (tokens[level]) {
      jsonOutput[level] = {}
      for (const token of tokens[level]) {
        jsonOutput[level][token.name] = {
          value: resolveValue(token.value, tokens),
          type: token.type,
          description: token.description || ''
        }
      }
    }
  }
  await fs.writeJson(path.join(outputDir, 'tokens.json'), jsonOutput, { spaces: 2 })
  console.log('✓ Exported tokens.json')
}

async function exportTailwind(tokens) {
  const tailwind = {
    theme: {
      colors: {},
      spacing: {},
      borderRadius: {},
      boxShadow: {},
      transitionDuration: {},
      screens: {},
      fontFamily: {},
      fontSize: {},
      fontWeight: {}
    }
  }
  
  for (const level of tokenLevels) {
    if (tokens[level]) {
      for (const token of tokens[level]) {
        const value = resolveValue(token.value, tokens)
        switch (token.type) {
          case 'color':
            tailwind.theme.colors[token.name] = value
            break
          case 'spacing':
            tailwind.theme.spacing[token.name.replace('spacing-', '')] = value
            break
          case 'radius':
            tailwind.theme.borderRadius[token.name.replace('radius-', '')] = value
            break
          case 'shadow':
            tailwind.theme.boxShadow[token.name.replace('shadow-', '')] = value
            break
          case 'duration':
            tailwind.theme.transitionDuration[token.name.replace('duration-', '')] = value
            break
          case 'breakpoint':
            tailwind.theme.screens[token.name.replace('breakpoint-', '')] = value
            break
          case 'font':
            if (token.group === 'family') {
              tailwind.theme.fontFamily[token.name.replace('font-', '')] = value.split(',').map(f => f.trim().replace(/^['"]|['"]$/g, ''))
            } else if (token.group === 'size') {
              tailwind.theme.fontSize[token.name.replace('text-', '')] = value
            } else if (token.group === 'weight') {
              tailwind.theme.fontWeight[token.name.replace('font-', '')] = Number(value)
            }
            break
        }
      }
    }
  }
  
  await fs.writeJson(path.join(outputDir, 'tailwind.config.json'), tailwind, { spaces: 2 })
  console.log('✓ Exported tailwind.config.json')
}

async function main() {
  await fs.ensureDir(outputDir)
  const tokens = await loadTokens()
  
  console.log(`Loaded ${tokens.global?.length || 0} global tokens`)
  console.log(`Loaded ${tokens.alias?.length || 0} alias tokens`)
  console.log(`Loaded ${tokens.component?.length || 0} component tokens`)
  
  await Promise.all([
    exportCSS(tokens),
    exportSCSS(tokens),
    exportJSON(tokens),
    exportTailwind(tokens)
  ])
  
  console.log('\n✅ All token files exported successfully!')
}

main().catch(console.error)