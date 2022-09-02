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

    component.addOperation("CreateShortcut", "@TargetDir@/mingw32.exe", "@StartMenuDir@/MSYS2 MINGW32.lnk", "iconPath=@TargetDir@/mingw32.exe");
    component.addOperation("CreateShortcut", "@TargetDir@/mingw64.exe", "@StartMenuDir@/MSYS2 MINGW64.lnk", "iconPath=@TargetDir@/mingw64.exe");
    component.addOperation("CreateShortcut", "@TargetDir@/ucrt64.exe", "@StartMenuDir@/MSYS2 UCRT64.lnk", "iconPath=@TargetDir@/ucrt64.exe");
    component.addOperation("CreateShortcut", "@TargetDir@/clang64.exe", "@StartMenuDir@/MSYS2 CLANG64.lnk", "iconPath=@TargetDir@/clang64.exe");
    component.addOperation("CreateShortcut", "@TargetDir@/msys2.exe", "@StartMenuDir@/MSYS2 MSYS.lnk", "iconPath=@TargetDir@/msys2.exe");

    component.addOperation( "Execute",
                           ["@TargetDir@\\usr\\bin\\bash.exe", "--login", "-c", "exit"]);
}

Component.prototype.createOperations = function()
{
    component.createOperations();
    createShortcuts();
}
