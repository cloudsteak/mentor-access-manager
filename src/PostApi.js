import React from 'react'
import './App.css';
import App from './App';

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

        fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(data)
        }).then((result) => {
            console.log(result);

        })
    }

    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <br /><br />
                        <h3>Azure 6 hetes képzés - hozzáférés igénylő</h3><br />
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Teljes név :</label>
                                <input type="text" class="form-control fields" name="userfullname" onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Email cím :</label>
                                <input type="text" class="form-control fields" name="emailaddress" onChange={this.handleInputChange} />
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Biztonsági szó :</label>
                                <input type="password" class="form-control fields" name="passphrase" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn" onClick={() => this.submit()}>Igény küldése</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PostApi;