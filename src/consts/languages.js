export default {
  pl: {
    appName_: 'SpotFinder',
    loginScreen: {
      username_: 'Nazwa użytkownika',
      password_: 'Hasło',
      email_: 'Email',
      helloMessage_: 'Witaj w ',
      message_: 'Zaloguj się.',
      forgotPassword_: 'Zapomniałeś hasła?',
      noAccountMessage_: 'Nie masz jeszcze konta? Zarejestruj się.',
      button_: 'Zaloguj się!',
      rules_: 'Akceptuję regulamin',
      login_: 'Masz już konto? Zaloguj się',
      registerButton_: 'Zarejestruj się',
      alertHeader_: 'Konto zostało aktywowane!',
      alertLink_: 'Zaloguj się',
      alertHeaderRegister_:
        'Poprawnie zarejestrowano. Wysłaliśmy link aktywacyjny na podany email.',
      errorRegister_:
        'Użytkownik o podanym adresie email lub nazwie użytkownika już istnieje!',
      errorLogin_: 'Niepoprawne dane!',
    },
    requiredField: '* - to pole jest wymagane',
    resetPassword: {
      emailPage: {
        header_: 'Wpisz adres email na który wyślemy link do zmiany hasła',
        email_: 'Email',
        button_: 'Wyślij',
        successMsg_: 'Mail został wysłany na podany adres. Sprawdź skrzynke',
        error_: 'Podaj poprawny email',
      },
      setPassword: {
        header_: 'Wpisz nowe hasło',
        password_: 'Nowe hasło',
        rePassword_: 'Powtórz hasło',
        button_: 'Zapisz',
        successMsg_: 'Hasło zostało zmienione.',
        linkMsg_: 'Zaloguj się',
        error_: 'Hasła nie są takie same!',
      },
    },
    sidebarList: {
      dashboard_: 'Panel główny',
      addLocalization_: 'Dodaj lokalizację',
      userSettings_: 'Ustawienia',
    },
    dashboard: {
      header_: 'Filtruj lokalizację po kategorii',
      categories: {
        hobby: 'Hobby',
        kultura: 'Kultura',
        impreza: 'Impreza',
        rekreacja: 'Rekreacja',
        sport: 'Sport',
        inne: 'Inne',
        zwiedzanie: 'Zwiedzanie',
        odpoczynek: 'Odpoczynek',
        all: 'Wszystkie',
      },
      subtitle_:
        'Wybierz jedną z lokalizacji - przybliż mapę aby zobaczyć oznaczone miejsca',
    },
    user: {
      header_: 'Modyfikuj swoje dane',
      username_: 'Nazwa użytkownika',
      email_: 'Email',
      password_: 'Hasło',
      rePassword_: 'Powtórz hasło',
      settings: {
        header_: 'Szablon',
        theme: {
          light_: 'Jasny',
          dark_: 'Ciemny',
        },
        language: {
          header_: 'Język',
          pl_: 'PL',
          en_: 'EN',
        },
      },
    },
    posts: {
      add: {
        header_: 'Dodaj post',
        title_: 'Tytuł',
        city_: 'Miejscowość',
        text_: 'Treść',
        button_: 'Zapisz',
        file_: 'Wybierz zdjęcie',
        category_: 'Kategoria',
        validationMsg_: 'Wszystkie pola oznaczone gwiazką są wymagane',
      },
      edit: {
        header_: 'Edytuj post',
        button_: 'Zapisz',
      },
    },
    comments: {
      add: {
        textArea_: 'Napisz coś',
        button_: 'Dodaj',
      },
      edit: {
        header_: 'Edytuj komentarz',
        button_: 'Zapisz',
      },
    },
    postTimes: {
      first: 'Mniej niż minutę temu',
      second: 'Minut temu',
      third: 'Godzinę temu',
      fourth: 'Godzin temu',
    },
    notifications: {
      user_: 'Użytkownik',
      likeComment_: 'lubi twój komentarz',
      notLikeComment_: 'nie lubi twojego komentarza',
      likePost_: 'lubi twój post',
      notLikePost_: 'nie lubi twojego postu',
      commented_: 'skomentował twój post',
      showMore_: 'Pokaż więcej',
    },
    alerts: {
      loginError: {
        title_: 'Błąd logowania',
        desc_: 'Nie udało się zalogować używjąc podanych danych logowania.',
      },
      loginSuccess: {
        title_: 'Poprawnie zalogowano!',
        desc_: 'Zostałeś poprawnie zalogowany.',
      },
      requestError: {
        title_: 'Błąd pobierania danych',
        desc_: 'Nie udało się pobrać danych o ',
      },
      dataProccessError: {
        title_: 'Błąd przetwarzania danych',
        desc_: 'Podczas przetwarzania danych wystąpił błąd',
      },
      addDataSuccess: {
        title_: 'Sukces',
        desc_: 'Pomyślnie zapisano dane',
      },
      requestWarning: {
        title_: 'Nie znaleziono',
        desc_: 'Nie udało się odnaleźć żadnych danych o podanych kryteriach',
      },
      noResults: {
        title_: 'Brak wyników',
        desc_: 'Nie znaleziono wyników w podanym przedziale',
      },
      noUsersAlert: 'Nie dodano jeszcze żadnego użytkownika.',
    },
  },
  en: {
    appName_: 'SpotFinder',
    loginScreen: {
      username_: 'User Name',
      email_: 'Email',
      password_: 'Password',
      helloMessage_: 'Welcome in ',
      message_: 'Log in!',
      forgotPassword_: 'Forgot password?',
      noAccountMessage_: 'Dont have account yet? Sign up!',
      button_: 'Log in',
      rules_: 'Accept rules',
      login_: 'Have an account? Log in.',
      registerButton_: 'Register',
      alertHeader_: 'Successfuly confirmed',
      alertLink_: 'Log in!',
      alertHeaderRegister_:
        'Successfuly regitered. We sent activation link on your email address!',
      errorRegister_: 'User with given username or email address exists',
      errorLogin_: 'Bad credentials',
    },
    requiredField: '* - this field is required',
    resetPassword: {
      emailPage: {
        header_:
          'Enter your email address and we send you message with link to change your password',
        email_: 'Email',
        button_: 'Send',
        successMsg_: 'Message was sent. Check your mail box',
        error_: 'Invalid email!',
      },
      setPassword: {
        header_: 'Set your new password',
        password_: 'New password',
        rePassword_: 'Repeat password',
        button_: 'Save',
        successMsg_: 'Password was changed',
        linkMsg_: 'Log in',
        error_: 'Passwords are not the same ',
      },
    },
    sidebarList: {
      dashboard_: 'Dashboard',
      addLocalization_: 'Add localization',
      userSettings_: 'Settings',
    },
    dashboard: {
      header_: 'Filter localizations by category',
      categories: {
        hobby: 'Hobby',
        kultura: 'Culture',
        impreza: 'Party',
        rekreacja: 'Recreation',
        sport: 'Sport',
        inne: 'Different',
        zwiedzanie: 'Sightseeing',
        odpoczynek: 'Chill',
        all: 'All',
      },
      subtitle_:
        'Select one localization - scroll map to place to see them all',
    },
    user: {
      header_: 'Change your data',
      username_: 'Username',
      email_: 'Email',
      password_: 'Password',
      rePassword_: 'Repeat password',
      settings: {
        header_: 'Theme',
        theme: {
          light_: 'Light',
          dark_: 'Dark',
        },
        language: {
          header_: 'Language',
          pl_: 'PL',
          en_: 'EN',
        },
      },
    },
    posts: {
      add: {
        header_: 'Add new post',
        title_: 'Title',
        city_: 'City',
        text_: 'Description',
        button_: 'Save',
        file_: 'Select picture',
        category_: 'Category',
        validationMsg_: 'All fields with * are required',
      },
      edit: {
        header_: 'Edit post',
        button_: 'Save',
      },
    },
    comments: {
      add: {
        textArea_: 'Write something',
        button_: 'Add',
      },
      edit: {
        header_: 'Edit comment',
        button_: 'Save',
      },
    },
    postTimes: {
      first: 'Less than minute ago',
      second: 'Minutes ago',
      third: 'One hour ago',
      fourth: 'Hours ago',
    },
    notifications: {
      user_: 'User',
      likeComment_: 'like your comment',
      notLikeComment_: 'do not like your comment',
      likePost_: 'like your post',
      notLikePost_: 'do not like your post',
      commented_: 'commented your post',
      showMore_: 'Show more',
    },
    alerts: {
      loginError: {
        title_: 'Login error',
        desc_: 'Cant access using provided credentials',
      },
      loginSuccess: {
        title_: 'Successfuly logged in!',
        desc_: 'You are logged in successfuly',
      },
      requestError: {
        title_: 'Fetching data error',
        desc_: 'Failed to fetch data about ',
      },
      dataProccessError: {
        title_: 'Data proccess error',
        desc_: 'While data proccessing an error has occured',
      },
      addDataSuccess: {
        title_: 'Success',
        desc_: 'Successfuly added data',
      },
      requestWarning: {
        title_: 'Not founded',
        desc_: 'Failed to fetch data with given criteria',
      },
      noResults: {
        title_: 'No result',
        desc_: 'There is no result in given period',
      },
      noUsersAlert: "You haven't added any user yet.",
    },
  },
};
