

function init() {
    gapi.load("auth2", async () => {
        var auth = gapi.auth2.init({
            client_id: "527034415010-hua0stku4spekrpneoae6kr1ej22t5cq.apps.googleusercontent.com",
            scope: "https://www.googleapis.com/auth/contacts.readonly"
        })
        auth.attachClickHandler(document.getElementById("googleBtn"), {},
            async (googleUser) => {
                var token = await googleUser.getAuthResponse().access_token
                var xml = new XMLHttpRequest()
                var url = "https://www.google.com/m8/feeds/contacts/default/full?alt=json&access_token=" + token + "&max-results=500&v=3.0"
                xml.open("GET", url, true)
                xml.send()
                try {
                    xml.onload = () => {
                        var contacts = JSON.parse(xml.response).feed.entry
                        var temp = []
                        for (const iterator of contacts) {
                            if ("gd$email" in iterator) {
                                var email = iterator["gd$email"][0].address
                                var name = (iterator["title"]["$t"]) ? iterator["title"]["$t"] : email
                                temp.push({ name, email })
                                parseData(temp)
                            }
                        }
                    }
                    xml.onerror = () => alert('Error: refresh page ')
                } catch (e) { alert('Error: refresh page') }
            })
    })
}

