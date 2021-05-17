# Falling Sand

Small sand simulator written in Javascript + typescript that runs on the web browser. This is the first implementation of this used as a test for pixi.js and webpack.

npm packages :

- webpack
- webpack-dev-server
- http-server

bundle packages with :

```bash
npm run build
```

js files in `./src` are output in `./dist` .

`./dist/index.html` can be opened to see the falling sand

---

### To do :

- [ ]  Improve sand and water movement
- [ ]  Refactor sand logic
- [ ]  consider switching to canvas over dixi.js
- [ ]  add compatability with typescript directly
- [ ]  add mouse onclick events to canvas
- [ ]  implement is_static to non moving particles

---