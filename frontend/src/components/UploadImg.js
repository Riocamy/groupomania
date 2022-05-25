import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Utilisation d'une classe pour mettre en place le module d'ajout d'image
class UploadImg extends Component {
  state = {
    file: null,
  };

  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file: file });
  }

  // Fonction pour télécharger l'image de profil
  handleUpload(e) {
    const auth = Cookies.get("Token");
    const file = this.state.file;
    const id = localStorage.getItem("id");
    let formdata = new FormData();

    formdata.append("image", file);

    axios({
      url: `http://localhost:8080/api/user/image/${id}`,
      method: "POST",
      headers: {
        authorization: `${auth}`,
      },
      data: formdata,
    }).then((res) => {
      const id = localStorage.getItem("id");
      return (window.location = `/profil/${id}`);
    });
  }

  // Intégration du module de modification d'images
  render() {
    return (
      <div>
        <form>
          <div className="info-profile">
            <label htmlFor="Ajouter image">
              <input
                type="file"
                title="Changer image de profil"
                accept="image/*"
                name="file"
                id="ajouter-image"
                onChange={(e) => this.handleFile(e)}
              />
            </label>
          </div>
          <button type="button" onClick={(e) => this.handleUpload(e)}>
            Upload
          </button>
        </form>
      </div>
    );
  }
}

export default UploadImg;