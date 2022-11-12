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
    installer.setDefaultPageVisible(QInstaller.TargetDirectory, true);
    installer.setDefaultPageVisible(QInstaller.ComponentSelection, false);
    installer.setDefaultPageVisible(QInstaller.ReadyForInstallation, false);
    installer.setDefaultPageVisible(QInstaller.StartMenuSelection, true);
    installer.setDefaultPageVisible(QInstaller.LicenseCheck, false);
}
