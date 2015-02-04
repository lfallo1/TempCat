The SeleniumRunner project and the WPF application within is not built to be
run free-standing. The WPF application within SeleniumRunner was built to run
at the start of a Selenium Test Suite. The WPF controls things that would
normally be controlled through a config file, such as the following:

UserName
Password
Browser to test
Default Timeout
