import { sendSupportMessageFromDutySupport } from "@lib/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
const SupportView = ({ support, goBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState("");

  const sendMessage = async (e) => {
    if (!id) return;
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await sendSupportMessageFromDutySupport({
        text,
        receiverId: id,
        supportId: support.id,
      });
      toast.success("Successfully sent message!");
      setText("");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={goBack}
        className="btn rounded btn-wide bg-gray-700 mb-4"
      >
        Back
      </button>
      <div className="bg-gray-700 p-4 rounded">
        <div>
          <p className="underline font-semibold">Message</p>
          <p>{support.message}</p>
        </div>
        <div className="mt-8">
          <p className="underline font-semibold">Reply</p>
          <p>{support.repliedText || "No reply yet"}</p>
        </div>
        <form onSubmit={sendMessage} className="mt-8 w-full">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            rows={4}
            className="textarea w-full"
          />
          <div className="flex justify-end mt-4">
            <button
              className={`btn btn-warning btn-wide rounded ${
                isLoading && "loading"
              }`}
            >
              {support.repliedText ? "Update" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportView;
