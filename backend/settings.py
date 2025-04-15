class Settings:

    # these are the default settings
    def __init__(self):
        self.dark_mode = False
        self.font_size = 24
        self.timezone = "GMT - 6"
        self.enable_notification = True
        self.notification_frequency = "Daily"

    # this function is used to set the dark mode
    def set_dark_made(self,mode):
        if mode:
            self.dark_mode = True
        else:
            self.dark_mode = False
        print("Settings Updated Successfully")

    # this function sets the fnt sixe
    def set_font_size(self,size):
        if size < 10:
            print("Size must be at least 10")
            return False
        elif size > 30:
            print("Size must be at least 30")
            return False
        else:
            self.font_size = size
            print("Settings Updated Successfully")
            return True

    # this function sets the timezone
    def set_timezone(self,timezone):
        self.valid_timezones = ["UTC-06:00", "UTC", "UTC+06:00"]
        if timezone not in self.valid_timezones:
            print("Invalid timezone")
            return False
        else:
            print("Settings Updated Successfully")
            self.timezone = timezone


    # this function enables notifications based on a boolean
    def enable_notifications(self, enable):
        if enable:
            self.enable_notification = True
        else:
            self.enable_notification = False
        print("Settings Updated Successfully")

    # this function sets the notification frequence
    def set_notification_frequency(self, frequency):
        if frequency not in ["Daily", "Weekly", "Monthly"]:
            print("Invalid Notification Frequency")
            return False
        self.notification_frequency = frequency
        print("Settings Updated Successfully")
        return True

    # this function is used to display the settings
    def display_settings(self):
        print("Settings:")
        print(f"Dark Mode: {self.dark_mode}")
        print(f"Font Size: {self.font_size}")
        print(f"Timezone: {self.timezone}")
        print(f"Enable Notification: {self.enable_notification}")
        print(f"NotificationFrequency: {self.notification_frequency}")
        print()

# we test these functions in the main
if __name__ == '__main__':

    #Displaying the default settings
    settings = Settings()
    print("Default Settings:")
    settings.display_settings()

    # testing the set dark mode function
    settings.set_dark_made(True)
    print("Dark Mode Enabled:")
    settings.display_settings()

    # testing the test font sixe function
    settings.set_font_size(12)
    print("Font Size Set:")
    settings.display_settings()

    # testing the set timezone function
    settings.set_timezone("UTC")
    print("Timezone Set:")
    settings.display_settings()

    # testing the enable notifications function
    settings.enable_notifications(False)
    print("Notifications Disabled:")
    settings.display_settings()

    # testing the set notification frequency function
    settings.set_notification_frequency("Weekly")
    print("Notification Frequency Set:")
    settings.display_settings()

    # testing the invalid font sizes
    settings.set_font_size(5)
    settings.set_font_size(35)

    # testing the invalid timezone
    settings.set_timezone("Invalid")

    # testing the invalid frequency
    settings.set_notification_frequency("Yearly")
