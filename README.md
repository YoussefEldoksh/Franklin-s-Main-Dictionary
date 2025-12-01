# Franklin's Main Dictionary

**Description**
- **What**: A small web-based dictionary project that serves a searchable list of words and definitions.
- **Stack**: Plain HTML/CSS/JavaScript with a minimal Node.js server (`server.js`).

**Features**
- **Static UI**: `index.html`, `style.css`, and `main.js` provide the frontend.
- **Node server**: `server.js` serves the app and any API endpoints.
- **Easy to run**: Simple `npm`-based scripts included in `package.json`.

**Repository Files**
- `index.html`: The app's main HTML file.
- `style.css`: Styles for the frontend.
- `main.js`: Frontend JavaScript (search, UI interactions).
- `server.js`: Minimal Node.js server to serve files and handle requests.
- `package.json`: Project metadata and scripts.
- `Dockerfile`: Optional container setup.

**Getting Started**
Prerequisites: Node.js (v14+) and `npm`.

Windows (cmd.exe):
```cmd
cd "c:\Users\Lenovo\OneDrive - Alexandria University\Documents\Franklin's Main\Franklin-s-Main-Dictionary"
npm install
npm start
```

macOS / Linux (bash):
```bash
cd "Franklin-s-Main-Dictionary"
npm install
npm start
```

After `npm start`, open your browser to `http://localhost:3000` (or the port indicated in `server.js`).

**Development**
- **Run locally**: Use `npm start` to run the server and load the frontend.
- **Edit frontend**: Modify `index.html`, `style.css`, or `main.js` to change UI or behavior.
- **Edit server**: Modify `server.js` to add API endpoints or change the serve logic.
- **Linting / formatting**: Add your preferred tools (Prettier / ESLint) if desired.

**Testing**
- There are no automated tests included. For manual checks: open the app in a browser, try searching, and confirm the server serves static assets.

**Contributing**
- **Bugs & improvements**: Open an issue on GitHub or submit a pull request.
- **Code style**: Keep changes small and focused; add documentation for new features.

**License**
- No license is specified. If you'd like to make this project open source, consider adding a `LICENSE` file (MIT is a common choice).

**Contact / Source**
- **Repo**: `https://github.com/YoussefEldoksh/Franklin-s-Main-Dictionary`
- **Author**: Project owner `YoussefEldoksh`

---
**Image**
- **Docker-Repo**: youssefeldoksh/frank_dictionary
    it can be used to pull the docker image from docker hub directly
**Deployment**
- **Docker**: This project includes a `Dockerfile` for containerizing the app. I deployed the container successfully using google cloud.
- **Deployed URL**:
```
https://frank-dictionary-992833418374.europe-west2.run.app/
```
