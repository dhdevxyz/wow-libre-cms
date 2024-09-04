import React from "react";
import Swal from "sweetalert2";

interface ErrorProps {
  error: { message: string };
}

const showAlert = async (error: { message: string }) => {
  try {
    const result = await Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.message}`,
      color: "white",
      background: "#0B1218",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Reportar Problema",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      customClass: {
        popup: "swal-dark-theme-popup",
        confirmButton: "swal-dark-theme-confirm-btn",
        cancelButton: "swal-dark-theme-cancel-btn",
      },
    });

    if (result.isConfirmed) {
      console.log("Usuario hizo clic en Aceptar");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      console.log("Usuario hizo clic en Reportar Problema");
    }
  } catch (err) {
    console.error("Error al mostrar la alerta:", err);
  }
};

const AlertComponent: React.FC<ErrorProps> = ({ error }) => {
  React.useEffect(() => {
    if (error && error.message) {
      showAlert(error);
    }
  }, [error]);

  return null;
};

export default AlertComponent;
