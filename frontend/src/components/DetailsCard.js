import React from "react"
import formatString from "../util/StringFormat"
import PropTypes from "prop-types";


function DetailsCard({person}) {
    const KeyValueRow = ({keyName, value }) => {

        return (
            <>
                <div className="row">
                    <div className="col-sm-3">
                            <p className="mb-0">{formatString(keyName)}</p>
                    </div>
                    <div className="col-sm-9">
                            <p className="text-muted mb-0">{value}</p>
                    </div>
                </div>
                <hr/>
            </>
        )
    }

    return (
        <div className="card mb-4">
            <div className="card-body">
                {Object.keys(person).map((key) => (
                    <KeyValueRow key={key} keyName={key} value={person[key]} />
                ))}
            </div>
        </div>
    )
}


DetailsCard.prototype ={
    person: PropTypes.object.isRequired
}

export default DetailsCard