const errors = {
  something_went_wrong: 'Ops! Algo deu errado.',
  page_not_found: 'Página não encontrada',
  unknown_server_error: 'Ocorreu um erro desconhecido no servidor',
  empty: 'Sem dados',
  missing_total_number: 'Não foi possível encontrar Total-Number nos cabeçalhos de resposta',
  invalid_uri_format: 'Formato de URI inválido',
  invalid_origin_format: 'Formato de origem de URI inválido',
  invalid_json_format: 'Formato JSON inválido',
  invalid_error_message_format: 'O formato da mensagem de erro é inválido.',
  required_field_missing: 'Por favor, insira {{field}}',
  required_field_missing_plural: 'Você deve inserir pelo menos um {{field}}',
  more_details: 'Mais detalhes',
  username_pattern_error:
    'O nome de usuário deve conter apenas letras, números ou sublinhado e não deve começar com um número.',
  password_pattern_error:
    'Password requires a minimum of {{min}} characters and contains a mix of letters, numbers, and symbols.', // UNTRANSLATED
  insecure_contexts: 'Contextos inseguros (não-HTTPS) não são suportados.',
  unexpected_error: 'Um erro inesperado ocorreu',
  not_found: '404 not found', // UNTRANSLATED
  create_internal_role_violation:
    'You are creating a new internal role which is forbidden by Logto. Try another name that does not start with "#internal:".', // UNTRANSLATED
};

export default errors;
