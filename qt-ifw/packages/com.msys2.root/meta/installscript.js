function cancelInstaller(message)
{
    installer.setDefaultPageVisible(QInstaller.Introduction, false);
    installer.setDefaultPageVisible(QInstaller.TargetDirectory, false);
    installer.setDefaultPageVisible(QInstaller.ComponentSelection, false);
    installer.setDefaultPageVisible(QInstaller.ReadyForInstallation, false);
    installer.setDefaultPageVisible(QInstaller.StartMenuSelection, false);
    installer.setDefaultPageVisible(QInstaller.PerformInstallation, false);
    installer.setDefaultPageVisible(QInstaller.LicenseCheck, false);

    var abortText = "<font color='red'>" + message +"</font>";
    installer.setValue("FinishedText", abortText);
    installer.setValue("RunProgram", null);
}

function isSupported()
{
    if (systemInfo.kernelType === "winnt") {
        var major = parseInt(systemInfo.kernelVersion.split(".", 1));
        var minor = parseInt(systemInfo.kernelVersion.split(".", 2)[1]);
        // Windows >= 8.1
        if (major > 6 || (major == 6 && minor >= 3)) {
            return true;
        }
    }
    return false;
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
    component.addOperation("CreateShortcut", "@TargetDir@/clangarm64.exe", "@StartMenuDir@/MSYS2 CLANGARM64.lnk", "iconPath=@TargetDir@/clangarm64.exe");
    component.addOperation("CreateShortcut", "@TargetDir@/msys2.exe", "@StartMenuDir@/MSYS2 MSYS.lnk", "iconPath=@TargetDir@/msys2.exe");

    component.addOperation( "Execute",
                           ["@TargetDir@\\usr\\bin\\bash.exe", "--login", "-c", "exit"]);
}

function Component() {

    if (!isSupported()) {
        cancelInstaller("Installation on " + systemInfo.prettyProductName + " is not supported");
        return;
    }

    var systemDrive = installer.environmentVariable("SystemDrive");
    // Use C: as a default for messed up systems.
    if (systemDrive === "") {
        systemDrive = "C:";
    }
    var targetDir = installer.value("TargetDir", systemDrive+"\\msys64")

    installer.setValue("TargetDir", targetDir);
}

Component.prototype.createOperations = function()
{
    component.createOperations();
    createShortcuts();
}
