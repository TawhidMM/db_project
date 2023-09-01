import PropTypes from "prop-types";
import React from "react";

function ImageNameCard({ person }) {
    const { FULLNAME: name, PHOTO_URL: imageUrl } = person;

    return (
        <div className="card mb-4">
            <div className="card-body text-center">
                <img
                    src={imageUrl}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                />
                <h5 className="my-3">{name}</h5>
                <div className="d-flex justify-content-center mb-2" />
            </div>
        </div>
    );
}

ImageNameCard.prototype = {
    person: PropTypes.object.isRequired,
};

export default ImageNameCard;
