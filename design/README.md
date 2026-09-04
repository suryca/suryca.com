# Design reference

Original mockups for suryca.com, exported from the design tool. **Reference only**: nothing
here is imported by the Next.js app.

| File | What it is |
| --- | --- |
| `Suryca.dc.html` | Home page mockup (has an `accentMode` prop: Solar / Amber / Coral) |
| `Fizgot.dc.html`, `ExportAIChat.dc.html`, `Agents.dc.html` | Product pages |
| `Blog.dc.html`, `News.dc.html`, `Contact.dc.html` | Company pages |
| `Privacy.dc.html`, `Terms.dc.html`, `Security.dc.html` | Legal / trust pages |
| `support.js` | Generated runtime that renders the `*.dc.html` files. Do not edit. |
| `suryca-standalone.html` | Self-contained bundle of the home page; opens without `support.js`. |

To view a mockup, open the `.dc.html` file directly in a browser from this folder
(the pages link to each other by filename, so keep the names as they are).
