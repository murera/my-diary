class Response {
    success = (status, message, data) => ({
      status,
      message,
      data,
    });

      error = (code, message) => ({ status: code, error: message })
}

export default new Response();
