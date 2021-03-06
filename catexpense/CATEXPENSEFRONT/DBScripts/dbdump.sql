USE [master]
GO
/****** Object:  Database [expense12]    Script Date: 3/12/2015 9:12:01 AM ******/
CREATE DATABASE [expense12]

 ON  PRIMARY 
( NAME = N'expense12', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\expense12.mdf' , SIZE = 7168KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'expense12_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\expense12_log.ldf' , SIZE = 5696KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [expense12] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [expense12].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [expense12] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [expense12] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [expense12] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [expense12] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [expense12] SET ARITHABORT OFF 
GO
ALTER DATABASE [expense12] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [expense12] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [expense12] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [expense12] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [expense12] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [expense12] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [expense12] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [expense12] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [expense12] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [expense12] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [expense12] SET  DISABLE_BROKER 
GO
ALTER DATABASE [expense12] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [expense12] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [expense12] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [expense12] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [expense12] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [expense12] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [expense12] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [expense12] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [expense12] SET  MULTI_USER 
GO
ALTER DATABASE [expense12] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [expense12] SET DB_CHAINING OFF 
GO
USE [expense12]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Comments](
	[CommentId] [int] IDENTITY(1,1) NOT NULL,
	[ExpenseComment] [nvarchar](max) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateUpdated] [datetime] NOT NULL,
	[SubmissionId] [int] NOT NULL,
	[RepliconUserName] [varchar](255) NOT NULL,
 CONSTRAINT [PK_LineItemComment] PRIMARY KEY CLUSTERED 
(
	[CommentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Errors]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Errors](
	[ErrorId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[EndPoint] [varchar](255) NOT NULL,
	[Error] [varchar](255) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
 CONSTRAINT [PK_Errors] PRIMARY KEY CLUSTERED 
(
	[ErrorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ExpenseCategories]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpenseCategories](
	[ExpenseCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[ExpenseCategoryName] [nvarchar](16) NOT NULL,
 CONSTRAINT [PK_ExpenseCategory] PRIMARY KEY CLUSTERED 
(
	[ExpenseCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[FinanceApprovers]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FinanceApprovers](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userName] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[LineItems]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[LineItems](
	[LineItemId] [int] IDENTITY(1,1) NOT NULL,
	[SubmissionId] [int] NOT NULL,
	[Billable] [bit] NOT NULL,
	[ExpenseCategoryId] [int] NOT NULL,
	[LineItemDate] [datetime] NOT NULL,
	[LineItemDesc] [varchar](80) NOT NULL,
	[LineItemAmount] [money] NOT NULL,
	[LineItemMetadata] [nvarchar](max) NULL,
	[ReceiptPresent] [bit] NOT NULL,
	[StatusId] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateUpdated] [datetime] NOT NULL,
	[ManagerApproverDate] [date] NULL,
	[FinanceApproverDate] [date] NULL,
 CONSTRAINT [PK_LineItem] PRIMARY KEY CLUSTERED 
(
	[LineItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Receipts]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Receipts](
	[ReceiptId] [int] IDENTITY(1,1) NOT NULL,
	[ReceiptImage] [varbinary](max) NOT NULL,
	[Name] [varchar](255) NULL,
	[Type] [varchar](255) NULL,
	[DateCreated] [datetime] NOT NULL,
	[LineItemId] [int] NOT NULL,
 CONSTRAINT [PK_Receipts] PRIMARY KEY CLUSTERED 
(
	[ReceiptId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[RepliconUserProjects]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[RepliconUserProjects](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[ProjectId] [int] NOT NULL,
	[ManagerName] [varchar](255) NULL,
	[ProjectName] [varchar](255) NULL,
 CONSTRAINT [PK_RepliconUserProjects] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Status]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Status](
	[StatusId] [int] IDENTITY(1,1) NOT NULL,
	[StatusName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Status] PRIMARY KEY CLUSTERED 
(
	[StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Submissions]    Script Date: 3/12/2015 9:12:01 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Submissions](
	[SubmissionId] [int] IDENTITY(1,1) NOT NULL,
	[RepliconProjectId] [int] NOT NULL,
	[ActiveDirectoryUser] [nvarchar](40) NOT NULL,
	[WeekEndingDate] [date] NOT NULL,
	[RepliconManagerApproverDate] [date] NULL,
	[RepliconFinanceApproverId] [int] NULL,
	[RepliconFinanceApproverDate] [date] NULL,
	[StatusId] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateUpdated] [datetime] NOT NULL,
	[ManagerName] [varchar](255) NULL,
	[IsDeleted] [bit] NOT NULL,
	[Description] [varchar](max) NULL,
 CONSTRAINT [PK_Submission] PRIMARY KEY CLUSTERED 
(
	[SubmissionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

CREATE TABLE [dbo].[QbVendors](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[VendorId] [int] NOT NULL,
	[VendorName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_QbVendors] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[QbClients](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ClientId] [int] NOT NULL,
	[ClientName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_QbClients] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

CREATE TABLE [dbo].[QbAccounts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[AccountId] [int] NOT NULL,
	[AccountName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_QbAccounts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Submissions] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_LineItemComments_SubmissionId] FOREIGN KEY([SubmissionId])
REFERENCES [dbo].[Submissions] ([SubmissionId])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_LineItemComments_SubmissionId]
GO
ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [fk_expenseCategoryId] FOREIGN KEY([ExpenseCategoryId])
REFERENCES [dbo].[ExpenseCategories] ([ExpenseCategoryId])
GO
ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [fk_expenseCategoryId]
GO
ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [fk_submissions] FOREIGN KEY([SubmissionId])
REFERENCES [dbo].[Submissions] ([SubmissionId])
GO
ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [fk_submissions]
GO
ALTER TABLE [dbo].[Receipts]  WITH CHECK ADD  CONSTRAINT [FK_LineItems_LineItemId] FOREIGN KEY([LineItemId])
REFERENCES [dbo].[LineItems] ([LineItemId])
GO
ALTER TABLE [dbo].[Receipts] CHECK CONSTRAINT [FK_LineItems_LineItemId]
GO
ALTER TABLE [dbo].[Submissions]  WITH CHECK ADD  CONSTRAINT [FK_Submissions_Status] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO
ALTER TABLE [dbo].[Submissions] CHECK CONSTRAINT [FK_Submissions_Status]
GO
USE [master]
GO
ALTER DATABASE [expense12] SET  READ_WRITE 
GO
USE [expense12]
GO
INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('In Progress')
GO

INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('Submitted')
GO

INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('Manager Approved')
GO

INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('Manager Rejected')
GO

INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('Finance Approved')
GO

INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('Finance Rejected')
GO

INSERT INTO [dbo].[Status]
           ([StatusName])
     VALUES
           ('Quickbooks Failure')
GO

INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Mileage')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Per Diem')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Transportation')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Lodging')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Parking')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Entertainment')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Meals')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Airfare')
GO
INSERT INTO [dbo].[ExpenseCategories]
           ([ExpenseCategoryName])
     VALUES
           ('Other')
GO