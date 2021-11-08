function Component()
{
    // constructor
}

Component.prototype.isDefault = function()
{
    // select the component by default
    return true;
}

function createShortcuts()
{
    var windir = installer.environmentVariable("WINDIR");
    if (windir === "") {
        QMessageBox["warning"]( "Error" , "Error", "Could not find windows installation directory");
        return;
    }

    var cmdLocation = installer.value("TargetDir") + "\\msys2_shell.cmd";
    component.addOperation("CreateShortcut", cmdLocation, "@StartMenuDir@/MSYS2 MinGW x86.lnk", "-mingw32", "iconPath=@TargetDir@/mingw32.exe");
    component.addOperation("CreateShortcut", cmdLocation, "@StartMenuDir@/MSYS2 MinGW x64.lnk", "-mingw64", "iconPath=@TargetDir@/mingw64.exe");
    component.addOperation("CreateShortcut", cmdLocation, "@StartMenuDir@/MSYS2 MinGW UCRT x64.lnk", "-ucrt64", "iconPath=@TargetDir@/ucrt64.exe");
    component.addOperation("CreateShortcut", cmdLocation, "@StartMenuDir@/MSYS2 MinGW Clang x64.lnk", "-clang64", "iconPath=@TargetDir@/clang64.exe");
    component.addOperation("CreateShortcut", cmdLocation, "@StartMenuDir@/MSYS2 MSYS.lnk", "-msys", "iconPath=@TargetDir@/msys2.exe");

    if ("@BITNESS@bit" === "32bit") {
        component.addOperation( "Execute",
                               ["@TargetDir@\\autorebase.bat"]);
    }

    component.addOperation( "Execute",
                           ["@TargetDir@\\usr\\bin\\bash.exe", "--login", "-c", "exit"]);
}

Component.prototype.createOperations = function()
{
    component.createOperations();
    createShortcuts();
}
