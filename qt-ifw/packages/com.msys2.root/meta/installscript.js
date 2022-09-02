function Component() {
    var systemDrive = installer.environmentVariable("SystemDrive");
    // Use C: as a default for messed up systems.
    if (systemDrive === "") {
        systemDrive = "C:";
    }
    var targetDir = installer.value("TargetDir", systemDrive+"\\msys64")

    installer.setValue("TargetDir", targetDir);
    installer.setDefaultPageVisible(QInstaller.Introduction, false);
    installer.setDefaultPageVisible(QInstaller.TargetDirectory, true);
    installer.setDefaultPageVisible(QInstaller.ComponentSelection, false);
    installer.setDefaultPageVisible(QInstaller.ReadyForInstallation, false);
    installer.setDefaultPageVisible(QInstaller.StartMenuSelection, true);
    installer.setDefaultPageVisible(QInstaller.LicenseCheck, false);
}
