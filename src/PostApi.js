import React from 'react'
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

class PostApi extends React.Component {

    constructor() {
        super();
        this.state = {
            userfullname: null,
            emailaddress: null,
            passphrase: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }



    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    submit() {
        let url = "https://prod-44.northeurope.logic.azure.com:443/workflows/f3b208a84e5e433ebe7310b9d5fae93b/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=i2KgFhjZ7YOoFdkn3t8RRlk1lvd6rr7ho9AfOREIbj4";
        let data = this.state;
        if (data.emailaddress !== null && data.userfullname !== null && data.passphrase !== null) {
            if (this.validateEmail(data.emailaddress)) {
                fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(data)
                }).then((result) => {
                    console.log(result);
                    this.notify("Igény elindításra került. Ha jóváhagyják, 24 órád van elfogadni azt. (Ha nem találod a levelet, kérlek ellenőrizd a levélszemét mappát is.)", "success")
                    this.sleep(5000).then(r => {
                        window.location.reload(false);
                    })
                })
            } else {
                this.notify("Email cím nem helyes. Add meg a valódi email címed.", "error")
            }
        } else {
            this.notify("Egy vagy több mező nincs kitöltve", "error")
        }
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            return false;
        } else {
            return true;
        }
    }


    notify = (message, severity) => {
        switch (severity) {
            case 'error':
                toast.error(message)
                break;
            case 'success':
                toast.success(message)
                break;
            default:
                toast.info(message)
                break;
        }

    };

    render() {
        const appWidth = window.innerWidth
        return (
            <div>
                <p class="pageSubHeader">(Mentor Klub - Azure képzés 2025.)</p>
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="form-container" style={appWidth < 500 ? { paddingLeft: "50px" } : { paddingLeft: "35%" }}>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Teljes név: </label>
                                    <input type="text" style={appWidth < 500 ? { width: "200px" } : { width: "400px" }} class="form-control fields" name="userfullname" onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Email cím: </label>
                                    <input type="text" style={appWidth < 500 ? { width: "200px", marginLeft: "3px" } : { width: "400px", marginLeft: "3px" }} class="form-control fields" name="emailaddress" onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Biztonsági szó: </label>
                                    <input type="password" style={appWidth < 500 ? { width: "163px" } : { width: "363px" }} class="form-control fields" name="passphrase" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-12 text-center">
                                    <button type="submit" style={appWidth < 500 ? { width: "250px", marginLeft: "8%" } : { width: "300px", marginLeft: "5%" }} class="btn" onClick={() => this.submit()}>Igény küldése</button>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="light"
                                    />
                                    <div class="gdpr" style={appWidth < 500 ? { width: "310px" } : { width: "500px" }}><FontAwesomeIcon icon={faExclamationTriangle} size="3x" /><br />"Igény küldése" gombra kattintással elfogadod, hogy nevedet és email címedet a hozzáférés meglétének időtartamáig az oktató kezeli és tárolja, az Azure Entra ID-ban. Ezen adatokat az oktató harmadik félnek nem adja ki.
                                    <div class="docs"><a href='https://github.com/cloudsteak/mentor-klub-azure' rel='noreferrer' target='_blank'>Hasznos információk</a> | <a href='https://github.com/cloudsteak/mentor-klub-cloud/issues' rel='noreferrer' target='_blank'>Hiba bejelentés</a> | <a href='https://portal.azure.com' rel='noreferrer' target='_blank'>Azure Portál</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostApi;
