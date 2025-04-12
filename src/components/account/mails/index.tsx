import { getMails } from "@/api/account/mails";
import DisplayMoney from "@/components/money";
import { Items, MailsDto } from "@/model/model";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./style.css";
import LoadingSpinner from "@/components/utilities/loading-spinner";

interface MailsProps {
  token: string;
  characterId: number;
  accountId: number;
  serverId: number;
  t: (key: string, options?: any) => string;
}

const Modal: React.FC<{
  isOpen: boolean;
  items: Items[];
  onClose: () => void;
  t: (key: string, options?: any) => string;
}> = ({ isOpen, items, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-lg w-full shadow-lg border border-gray-800">
        <h3 className="text-2xl font-bold text-yellow-500 mb-4 border-b border-gray-700 pb-2">
          <i className="fas fa-gem"></i> {t("mails-items.title")}
        </h3>
        <ul className="space-y-2">
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item.item_id}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700"
              >
                <a
                  href={`https://www.wowhead.com/item=${item.item_id}`}
                  className="text-blue-400 hover:text-blue-600 font-semibold flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-info-circle mr-2"></i>
                  {t("mails-items.item-found")} {item.item_id}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-400">{t("mails-items.item-empty")}</li>
          )}
        </ul>
        <button
          className="mt-6 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-800 transition duration-300"
          onClick={onClose}
        >
          {t("mails-items.btn-close")}
        </button>
      </div>
    </div>
  );
};

const Mails: React.FC<MailsProps> = ({
  token,
  characterId,
  serverId,
  accountId,
  t,
}) => {
  const [mails, setMails] = useState<MailsDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const mailsPerPage = 1;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<Items[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedMails: MailsDto = await getMails(
          token,
          characterId,
          accountId,
          serverId
        );
        setMails(fetchedMails);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t("mails.error"),
          color: "white",
          background: "#0B1218",
          timer: 4500,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, characterId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const handleShowItems = (items: Items[]) => {
    if (items && Array.isArray(items)) {
      setCurrentItems(items);
    } else {
      setCurrentItems([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItems([]);
  };

  const indexOfLastMail = currentPage * mailsPerPage;
  const indexOfFirstMail = indexOfLastMail - mailsPerPage;
  const currentMails =
    mails?.mails.slice(indexOfFirstMail, indexOfLastMail) || [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-8 max-h-[600px] h-[400px] flex flex-col justify-between overflow-y-auto custom-scrollbar">
      <div>
        <div className="my-4 mx-8">
          <h2 className="text-3xl font-semibold text-white mb-6">
            {t("mails.title")}
          </h2>
          <hr className="border-t-1 border-gray-300" />
        </div>

        <div className="mx-2">
          {mails?.mails.length ? (
            currentMails.map((mail) => (
              <div key={mail.id} className="p-6 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl text-yellow-500 font-semibold">
                    {mail.subject}
                  </h3>
                  <span className="text-lg text-gray-200">
                    {new Date(mail.deliver_time).toLocaleDateString()}
                  </span>
                </div>
                {mail.body && (
                  <div className="text-white mb-4 text-md max-h-40 overflow-y-auto custom-scrollbar">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: mail.body.replaceAll("$B$B", "<br />"),
                      }}
                    />
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  {mail.has_items && (
                    <div className="text-white flex flex-col">
                      <FontAwesomeIcon
                        icon={faGift}
                        className="text-green-400 pt-5 pr-5"
                        title="Tiene items"
                      />
                      <button
                        className="mt-4 px-3 py-1 block w-full text-center font-bold action-button bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white  rounded-lg transition-all duration-300 shadow-lg"
                        onClick={() => handleShowItems(mail.items || [])}
                      >
                        {t("mails.detail-item")}
                      </button>
                    </div>
                  )}
                  {mail.money > 0 && (
                    <div className="flex items-center space-x-1 pt-9">
                      <span>
                        <DisplayMoney money={mail.money} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <span className="text-gray-200 text-xl">
                    {t("mails.submitted-by")}
                    {mail.sender_name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-200 text-xl">
                    {t("mails.expires")}
                    {new Date(mail.expire_time).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-end mt-2 space-x-4"></div>
              </div>
            ))
          ) : (
            <div className="text-white text-center mt-8">
              {t("mails.mail-empty")}
            </div>
          )}
        </div>
      </div>

      {/* Paginación */}
      {mails && mails?.mails.length > mailsPerPage && (
        <div className="flex justify-between mt-2 mx-2">
          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-700 text-white"
            }`}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {t("mails.btn.back")}
          </button>
          <button
            className={`mx-1 px-3 py-1 rounded-md ${
              indexOfLastMail >= (mails?.mails.length || 0)
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-700 text-white"
            }`}
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastMail >= (mails?.mails.length || 0)}
          >
            {t("mails.btn.next")}
          </button>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        items={currentItems}
        onClose={handleCloseModal}
        t={t}
      />
    </div>
  );
};

export default Mails;
