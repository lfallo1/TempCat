using System.Diagnostics;
using System.IO;
using System.Windows;
namespace TestRunner
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            if (File.Exists(@"C:/CatExpenseInfo.txt"))
            {
                using (var reader = new StreamReader(@"C:/CatExpenseInfo.txt"))
                {
                    ComboBox_Browser.Text = reader.ReadLine();
                    TextBox_UserName.Text = reader.ReadLine();
                    TextBox_Password.Password = reader.ReadLine();
                    if (string.IsNullOrEmpty(TextBox_UserName.Text) ||
                        string.IsNullOrEmpty(TextBox_Password.Password))
                    {
                        usrnamePassCB.IsChecked = false;
                    }
                }
            }
            else
            {
                usrnamePassCB.IsChecked = false;
            }
        }

        private void Button_Start_Click(object sender, RoutedEventArgs e)
        {
            SaveCredentials();
            Application.Current.Shutdown();
        }

        private void SaveCredentials()
        {
            using (var sw = new StreamWriter(@"C:/CatExpenseInfo.txt"))
            {
                sw.WriteLine(ComboBox_Browser.Text);
                if (usrnamePassCB.IsChecked == true)
                {
                    sw.WriteLine(TextBox_UserName.Text);
                    sw.WriteLine(TextBox_Password.Password);
                }
            }
        }

        private void usrnamePassCB_Click(object sender, RoutedEventArgs e)
        {
            if (usrnamePassCB.IsChecked == true)
            {
                if (MessageBox.Show("This will place a new .txt file in C:/ as CatExpenseInfo.txt. Continue?",
                    "Remember username and password?",
                    MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.No)
                {
                    usrnamePassCB.IsChecked = false;
                }
            }
        }
    }
}
