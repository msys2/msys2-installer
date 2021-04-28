function Controller()
{
}

Controller.prototype.IntroductionPageCallback = function()
{
  var widget = gui.currentPageWidget();
  radioNames = ["PackageManagerRadioButton", "UpdaterRadioButton"];
  for (name of radioNames) {
    var el = gui.findChild(widget, name);
    if (el != null) {
      el.hide();
    }
  }
}
