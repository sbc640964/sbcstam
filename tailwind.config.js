const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {

            animation:{
                fadeIn: 'fadeIn 0.2s linear',
                slideLeft: 'slideLeft 0.2s ease-in-out'
            },

            keyframes: {
                fadeIn: {
                    '0%': {opacity: 0, transform: 'translateY(-15px)'},
                    '100%': {opacity: 1, transform: 'translateY(0px)'},
                },
                slideLeft: {
                    '0%': {transform: 'translateX(-100%)'},
                    '100%': {transform: 'translateX(0%)'},
                }
            },

            colors: {
                success: colors.lime,
                error: colors.red,
                primary: colors.pink,
                gray: colors.blueGray
            }
        },
    },
    variants: {
        extend: {
            width: ['group-hover'],
            height: ['group-hover'],
        },
    },
    plugins: [
        require('tailwindcss-rtl'),
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar'),
    ],
}
