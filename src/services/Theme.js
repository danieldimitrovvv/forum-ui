class Theme {
  getNavbarThemeClass = (theme) => {
    switch (theme) {
      case 'red':
        return 'red-theme';
      case 'blue':
        return 'blue-theme';
      case 'dark':
        return 'dark-theme';
      default:
        return 'default-theme';
    }
  }

  getPaginationThemeClass = (theme) => {
    switch (theme) {
      case 'dark':
        return 'dark-theme';
      case 'red':
        return 'red-theme';
      case 'blue':
        return 'blue-theme';
      default:
        return 'default-theme';
    }
  }

  getButtonThemeClass = (theme) => {
    switch (theme) {
      case 'red':
        return 'red-theme';
      case 'blue':
          return 'blue-theme';
      case 'dark':
          return 'dark-theme';
      default:
        return 'default-theme';
    }
  }

  getSettingsThemeClass = (theme) => {
    switch (theme) {
      case 'red':
        return 'red-theme';
      case 'blue':
          return 'blue-theme';
      case 'dark':
          return 'dark-theme';
      default:
        return 'default-theme';
    }
  }

  getVoteThemeClass = (theme) => {
    switch (theme) {
      case 'red':
        return 'red-theme';
      case 'blue':
          return 'blue-theme';
      case 'dark':
          return 'dark-theme';
      default:
        return 'default-theme';
    }
  }

  getMainThemeClass = (theme) => {
    switch (theme) {
      case 'red':
        return 'red-theme-main';
      case 'blue':
          return 'blue-theme-main';
      case 'dark':
          return 'dark-theme-main';
      default:
        return 'default-theme-main';
    }
  }

  changeBodyStyle = (theme) => {
    this.changeBodyBackgroundColorStyle(theme);
    this.changeBodyColorStyle(theme);
  }

  changeBodyBackgroundColorStyle = (theme) => {
    let color = 'white';
    if (theme === 'dark') {
      color = 'rgb(126, 126, 126, 0.774)';
    }
    document.body.style.backgroundColor = color
  }

  changeBodyColorStyle = (theme) => {
    let color = 'black';
    if (theme === 'dark') {
      color = 'white';
    }
    document.body.style.color = color
  }
}

export default new Theme()
