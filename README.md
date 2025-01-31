# NgSRA

_ngSRA_ ist ein Tool, um die Standbelegung bei Meyton Schießständen anzuzeigen. Die Daten werden direkt von der Anlage abgefragt und können mit dem Tool auf einem Bildschirm angezeigt werden. [Heruntergeladen werden kann das Tool unter Releases.](https://github.com/poet-of-the-fall/ngSRA/releases).

Der Laptop, auf dem das Tool läuft, muss mit dem Meyton Netzwerk vom Schießstand verbunden sein. Im Idealfall läuft nach dem Start dann schon alles und sieht in etwa so aus:

![Übersicht](https://raw.githubusercontent.com/poet-of-the-fall/ngSRA/refs/heads/main/img/overview.png)

Wenn man mit der Maus auf die Oberfläche klickt, wechselt das Programm in den Vollbildmodus (ESC drücken, um da wieder raus zu kommen).

Wenn man die Maus auf der Oberfläche bewegt, erscheint unten rechts eine Schaltfläche, mit der man zu den Einstellungen gelangt.

![Einstellungen](https://raw.githubusercontent.com/poet-of-the-fall/ngSRA/refs/heads/main/img/settings.png)

Dort kann man unter anderem den Server ändern (fall nicht die Standardeinstellungen verwendet werden) und das Intervall, in dem die Oberfläche aktualisiert wird (evtl. hier die Zeit etwas höher setzen, teilweise funktioniert LANA nach einiger Zeit nicht mehr und der Server muss neu gestartet werden).

Auch das Layout lässt sich frei konfigurieren. So lassen sich z.B. die Namen der Schützen ausblenden, Schriftgrößen und Farben anpassen oder auch die Aufteilung der Spalten und Reihen einstellen.

## Information for Developers

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

### Prerequisits

You need to have `node.js` installed. Then run `npm install` to load dependencies.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Build electron app

First run the build command from above to build the project. After this you can run `npx @electron/packager . --all --overwrite --ignore=node_modules --ignore=src --ignore=public --ignore=.angular --ignore=.vscode` to build electron for all targets.

### Build tauri app

You need to have `rust` installed to build with [Tauri](https://v2.tauri.app). Then run `npx tauri build` to build for your current architecture.
