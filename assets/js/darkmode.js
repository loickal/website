/**
 * Init the objects
 */
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (toggleSwitch == null) {
    console.log("ToggleSwitch checkbox wasn't found... It loos like this PoloCloud page hasn't a header")
} else {
    /**
     * Checking if the item in the localStorage is set
     * If not -> then set the theme to the system one and save it in localStorage
     */
    if (currentTheme == null) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            //set dark mode
            toggleSwitch.checked = true;
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            //set light mode
            toggleSwitch.checked = false;
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    /**
     * Setting the checkbox to the value of the theme
     * If theme is dark -> set checkbox to checked
     */
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    /**
     * Listening to the color scheme
     * If update -> set the theme tempory
     */
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute('data-theme', newColorScheme);
        if (newColorScheme == "dark") {
            toggleSwitch.checked = true;
        } else {
            toggleSwitch.checked = false;
        }
    });

    /**
     * Listening on the checkbox
     */
    toggleSwitch.addEventListener('change', switchTheme, false);

    /**
     * Function for setting the teme for css and for the localStorage
     * @param {*} e 
     */
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
}