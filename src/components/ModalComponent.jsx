import "./css/Modal.css";
import { useNavigate } from "react-router-dom";

function ModalComponent(props){

    const navigate = useNavigate();




    return (
        <div className="modals">
                <div className="overlay"></div>
                <div className="modal-content">
                  <h4 className="heading">{props.heading}</h4>
                  <br/>
                  <br/>
                  <p className="content"> ( {props.name} ) -  {props.message} </p>

                  <button className="close-modal"
                  onClick={() => 
                    {
                        props.closePop();
                        navigate(props.url);

                    }
                    }
                  >
                    Close
                  </button>
                </div>
              </div>


    )

}


export default ModalComponent;