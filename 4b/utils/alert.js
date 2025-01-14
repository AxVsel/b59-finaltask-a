const Swal = require("sweetalert2");

function sendAlert(messages) {
  Swal.fire({
    title: "Oops",
    text: messages,
    icon: "error",
  });
}

module.exports = {
  sendAlert,
};
