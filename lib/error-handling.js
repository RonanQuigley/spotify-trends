function redirectToErrorPage(){
    res.redirect(res.redirect(
      "/#" +
        utilities.generateQueryString({
          error: "invalid_token"
        })
    ));  
  }
  