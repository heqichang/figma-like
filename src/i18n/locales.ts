import type { TranslationMessages } from './types'

export const enUS: TranslationMessages = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    search: 'Search',
    noResults: 'No results found',
    required: 'Required',
    optional: 'Optional'
  },
  button: {
    loading: 'Loading...',
    submit: 'Submit',
    reset: 'Reset'
  },
  input: {
    required: 'This field is required',
    invalid: 'Please enter a valid value',
    placeholder: 'Enter text...'
  },
  card: {
    expand: 'Expand',
    collapse: 'Collapse'
  },
  validation: {
    minLength: 'Must be at least {min} characters',
    maxLength: 'Must be at most {max} characters',
    min: 'Must be at least {min}',
    max: 'Must be at most {max}',
    email: 'Please enter a valid email address',
    pattern: 'Invalid format'
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
    page: 'Page {current} of {total}',
    showing: 'Showing {from} to {to} of {total} items'
  }
}

export const zhCN: TranslationMessages = {
  common: {
    loading: '加载中...',
    error: '错误',
    success: '成功',
    warning: '警告',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    delete: '删除',
    edit: '编辑',
    close: '关闭',
    search: '搜索',
    noResults: '未找到结果',
    required: '必填',
    optional: '可选'
  },
  button: {
    loading: '加载中...',
    submit: '提交',
    reset: '重置'
  },
  input: {
    required: '此字段为必填项',
    invalid: '请输入有效值',
    placeholder: '请输入文本...'
  },
  card: {
    expand: '展开',
    collapse: '收起'
  },
  validation: {
    minLength: '至少需要 {min} 个字符',
    maxLength: '最多 {max} 个字符',
    min: '不能小于 {min}',
    max: '不能大于 {max}',
    email: '请输入有效的邮箱地址',
    pattern: '格式无效'
  },
  pagination: {
    previous: '上一页',
    next: '下一页',
    page: '第 {current} 页，共 {total} 页',
    showing: '显示第 {from} 到 {to} 项，共 {total} 项'
  }
}

export const jaJP: TranslationMessages = {
  common: {
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功',
    warning: '警告',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    delete: '削除',
    edit: '編集',
    close: '閉じる',
    search: '検索',
    noResults: '結果が見つかりません',
    required: '必須',
    optional: '任意'
  },
  button: {
    loading: '読み込み中...',
    submit: '送信',
    reset: 'リセット'
  },
  input: {
    required: 'この項目は必須です',
    invalid: '有効な値を入力してください',
    placeholder: 'テキストを入力...'
  },
  card: {
    expand: '展開',
    collapse: '折りたたむ'
  },
  validation: {
    minLength: '{min}文字以上で入力してください',
    maxLength: '{max}文字以内で入力してください',
    min: '{min}以上の値を入力してください',
    max: '{max}以下の値を入力してください',
    email: '有効なメールアドレスを入力してください',
    pattern: '無効な形式です'
  },
  pagination: {
    previous: '前へ',
    next: '次へ',
    page: '{total}ページ中{current}ページ目',
    showing: '{total}件中{from}件から{to}件を表示'
  }
}
