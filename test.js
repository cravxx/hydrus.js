var hydrus_api = require("./index.js");
var c = new hydrus_api('eb79e9e2a40dddd159299408db072ed6e6573d488b50db499f70a211ba1fa1da')

c.api_version()
c.add_url("https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg")
c.get_url_info("https://images-ext-2.discordapp.net/external/OFQgQQfZdll80-opJXFOKPYCG_32rjT8eQvvYWE-Zxs/http/i.4cdn.org/g/1549666714889.jpg")
c.verify_access_key()