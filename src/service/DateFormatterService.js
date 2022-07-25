import React from "react";

class DateFormatter {
    dateFormat (value){
        var date = new Date(value)
        return date.toLocaleDateString()
    }
}

export default new DateFormatter()