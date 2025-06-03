export const typesErrorsKeys = {
  BadRequest: 400,
  Unauthorized: 401,
  SessionExpired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  RequestTimeout: 408,
  InternalServerError: 500,
};
export const typesErrors = {
  400: {
    title: '400: Solicitud incorrecta',
    message: 'La solicitud no pudo ser procesada. Verifica los datos enviados.',
  },
  401: {
    title: '401: No autorizado',
    message: 'No tienes acceso a este módulo solicita acceso al administrador..',
  },
  402: {
    title: '402: Sesión expirada',
    message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente para continuar',
  },
  403: {
    title: 'Prohibido (403)',
    message:
      'No tienes permisos suficientes para realizar esta acción. Contacta al administrador si necesitas acceso.',
  },
  404: {
    title: 'Recurso no encontrado (404)',
    message:
      'El recurso que intentas acceder no existe. Verifica la URL o utiliza la navegación para encontrar lo que buscas.',
  },
  405: {
    title: 'Método no permitido (405)',
    message:
      'La operación solicitada no está permitida. Verifica el método de la solicitud y vuelve a intentarlo.',
  },
  408: {
    title: 'Tiempo de espera agotado (408)',
    message:
      'La solicitud ha superado el tiempo límite de procesamiento. Por favor, inténtalo de nuevo más tarde.',
  },
  500: {
    title: 'Error interno del servidor (500)',
    message:
      'Se produjo un error inesperado en el servidor. Estamos trabajando para solucionarlo. Por favor, vuelve más tarde.',
  },
};
