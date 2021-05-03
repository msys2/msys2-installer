function Controller()
{
}

Controller.prototype.IntroductionPageCallback = function()
{
  const widget = gui.currentPageWidget();
  const radioNames = ["PackageManagerRadioButton", "UpdaterRadioButton"];
  for (const name of radioNames) {
    const el = gui.findChild(widget, name);
    if (el != null) {
      el.hide();
    }
  }
}
