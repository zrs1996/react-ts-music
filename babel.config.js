module.exports = {
    'presets': [
      '@babel/preset-env'
    ],
    'plugins': [
      [
        "transform-react-jsx",
        {
          prama: "React.createElement"
        }
      ]
    ]
  }