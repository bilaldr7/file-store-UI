
import { toast, Slide } from "react-toastify";


export function notification(type, title, message, timer = 2000) {
  const Msg = ({ title, message }) => (
    <div className="text-black">
      {title} <br />
      <small>{message}</small>
    </div>
  );
  switch (type) {
    case "success":
      toast.success(<Msg title={title} message={message} />, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: timer,
        transition: Slide,
      });
      break;

    case "error":
      toast.error(<Msg title={title} message={message} />, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: timer,
        transition: Slide,
      });
      break;

    case "warning":
      toast.warning(<Msg title={title} message={message} />, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: timer,
        transition: Slide,
      });
      break;

    default:
      break;
  }
}
