import React from "react";

function Demo() {


    return (
        <form>
        <label htmlFor="cars">Type a car:</label>
        <input list="carList" id="cars" name="car"/>
            <datalist id="carList">
                <option value="Volvo"/>
                <option value="Saab"/>
                <option value="Mercedes"/>
                <option value="Audi"/>
            </datalist>
            <br/><br/>
            <input type="submit" value="Submit"/>
    </form>
    )

}


export default Demo;