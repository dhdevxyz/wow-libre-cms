import { getAnnoucementProfession } from "@/api/annoucement";
import { InternalServerError } from "@/dto/generic";
import React from "react";
import Swal from "sweetalert2";

interface ConfirmationDialogProps {
  cost: number;
  serverId: number;
  characterId: number;
  skillId: number;
  accountId: number;
  token: string;
  onConfirm: (message: string) => void;
  onCancel: () => void;
  t: (key: string, options?: any) => string;
}

const Announcement: React.FC<ConfirmationDialogProps> = ({
  cost,
  serverId,
  characterId,
  skillId,
  accountId,
  token,
  onConfirm,
  onCancel,
  t,
}) => {
  const handleConfirm = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: t("send-announcement.title"),
      color: "white",
      background: "#0B1218",
      html: `
        <p>${t("send-announcement.subtitle", { cost })}</p>
        <textarea id="announcement-message" class="swal2-textarea"></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: t("send-announcement.btn.next"),
      cancelButtonText: t("send-announcement.btn.back"),
      preConfirm: () => {
        const userMessage = (
          document.getElementById("announcement-message") as HTMLTextAreaElement
        )?.value;
        if (!userMessage) {
          Swal.showValidationMessage(t("send-announcement.error.empty"));
          return false;
        }
        return userMessage;
      },
    });

    if (result.isConfirmed) {
      try {
        await getAnnoucementProfession(
          characterId,
          skillId,
          accountId,
          token,
          serverId,
          result.value // Pasamos el mensaje ingresado
        );
        onConfirm(result.value); // Enviar el mensaje a `Professions.tsx`
      } catch (error: any) {
        if (error instanceof InternalServerError) {
          Swal.fire({
            icon: "error",
            title: "Opss!",
            html: `
              <p><strong>Message:</strong> ${error.message}</p>
              <hr style="border-color: #444; margin: 8px 0;">
              <p><strong>Transaction ID:</strong> ${error.transactionId}</p>
            `,
            color: "white",
            background: "#0B1218",
          });
          return;
        }
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          color: "white",
          background: "#0B1218",
        });
      }
    } else {
      onCancel();
    }
  };

  React.useEffect(() => {
    handleConfirm();
  }, []);

  return null;
};

export default Announcement;
