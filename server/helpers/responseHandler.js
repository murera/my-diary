class Response {
    success = (status, message, data) => ({
      status,
      message,
      data,
    });

      error = (code, message) => ({ status: code, error: message });

      display = (status, message, error, data, res) => res.status(status).json({
        status, message, error, data,
      });
}

export default new Response();
