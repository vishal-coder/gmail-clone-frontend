export function ValidateEmail(mail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.match(mailformat)) {
    return true;
  }
  if (mail.trim() == "") {
    return true;
  }
  return false;
}
