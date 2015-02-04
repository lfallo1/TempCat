USE [Expense12]
GO

/****** Object:  Table [dbo].[ExpenseCategories]    Script Date: 12/22/2014 13:25:04 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ExpenseCategories]') AND type in (N'U'))
DROP TABLE [dbo].[ExpenseCategories]
GO

/****** Object:  Table [dbo].[LineItemComments]    Script Date: 12/22/2014 13:25:47 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LineItemComments]') AND type in (N'U'))
DROP TABLE [dbo].[LineItemComments]
GO

/****** Object:  Table [dbo].[LineItems]    Script Date: 12/22/2014 13:26:07 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[LineItems]') AND type in (N'U'))
DROP TABLE [dbo].[LineItems]
GO

/****** Object:  Table [dbo].[Receipts]    Script Date: 12/22/2014 13:26:32 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND type in (N'U'))
DROP TABLE [dbo].[Receipts]
GO

/****** Object:  Table [dbo].[Submissions]    Script Date: 12/22/2014 13:28:00 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Submissions]') AND type in (N'U'))
DROP TABLE [dbo].[Submissions]
GO

/****** Object:  Table [dbo].[RepliconUsers]    Script Date: 12/22/2014 13:27:11 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RepliconUsers]') AND type in (N'U'))
DROP TABLE [dbo].[RepliconUsers]
GO

/****** Object:  Table [dbo].[RepliconProjects]    Script Date: 12/22/2014 13:26:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RepliconProjects]') AND type in (N'U'))
DROP TABLE [dbo].[RepliconProjects]
GO


/****** Object:  Table [dbo].[Status]    Script Date: 12/22/2014 13:27:36 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Status]') AND type in (N'U'))
DROP TABLE [dbo].[Status]
GO



USE [Expense12]
GO

/****** Object:  Table [dbo].[ExpenseCategories]    Script Date: 12/22/2014 13:25:08 ******/
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
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

USE [Expense12]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_LineItemComments_LineItems]') AND parent_object_id = OBJECT_ID(N'[dbo].[LineItemComments]'))
ALTER TABLE [dbo].[LineItemComments] DROP CONSTRAINT [FK_LineItemComments_LineItems]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_LineItemComments_RepliconUsers]') AND parent_object_id = OBJECT_ID(N'[dbo].[LineItemComments]'))
ALTER TABLE [dbo].[LineItemComments] DROP CONSTRAINT [FK_LineItemComments_RepliconUsers]
GO


USE [Expense12]
GO

/****** Object:  Table [dbo].[Status]    Script Date: 12/22/2014 13:27:41 ******/
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
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
USE [Expense12]
GO

/****** Object:  Table [dbo].[RepliconProjects]    Script Date: 12/22/2014 13:26:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RepliconProjects](
	[RepliconProjectId] [int] IDENTITY(1,1) NOT NULL,
	[RepliconProjectName] [nvarchar](max) NOT NULL,
	[RepliconManagerName] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_RepliconProject] PRIMARY KEY CLUSTERED 
(
	[RepliconProjectId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

USE [Expense12]
GO

/****** Object:  Table [dbo].[RepliconUsers]    Script Date: 12/22/2014 13:27:15 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RepliconUsers](
	[RepliconUserId] [int] IDENTITY(1,1) NOT NULL,
	[RepliconUserName] [nvarchar](max) NOT NULL,
	[FinanceApprover] [bit] NOT NULL,
 CONSTRAINT [PK_RepliconUser] PRIMARY KEY CLUSTERED 
(
	[RepliconUserId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



USE [Expense12]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Submissions_RepliconProjects]') AND parent_object_id = OBJECT_ID(N'[dbo].[Submissions]'))
ALTER TABLE [dbo].[Submissions] DROP CONSTRAINT [FK_Submissions_RepliconProjects]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Submissions_RepliconUsers]') AND parent_object_id = OBJECT_ID(N'[dbo].[Submissions]'))
ALTER TABLE [dbo].[Submissions] DROP CONSTRAINT [FK_Submissions_RepliconUsers]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Submissions_Status]') AND parent_object_id = OBJECT_ID(N'[dbo].[Submissions]'))
ALTER TABLE [dbo].[Submissions] DROP CONSTRAINT [FK_Submissions_Status]
GO

USE [Expense12]
GO

/****** Object:  Table [dbo].[Submissions]    Script Date: 12/22/2014 13:28:04 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Submissions](
	[SubmissionId] [int] IDENTITY(1,1) NOT NULL,
	[RepliconProjectId] [int] NOT NULL,
	[ActiveDirectoryUser] [nvarchar](40) NOT NULL,
	[WeekEndingDate] [date] NOT NULL,
	[RepliconManagerApproverId] [int] NOT NULL,
	[RepliconManagerApproverDate] [date] NULL,
	[RepliconFinanceApproverId] [int] NULL,
	[RepliconFinanceApproverDate] [date] NULL,
	[StatusId] [int] NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateUpdated] [datetime] NOT NULL,
 CONSTRAINT [PK_Submission] PRIMARY KEY CLUSTERED 
(
	[SubmissionId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[Submissions]  WITH CHECK ADD  CONSTRAINT [FK_Submissions_RepliconProjects] FOREIGN KEY([RepliconProjectId])
REFERENCES [dbo].[RepliconProjects] ([RepliconProjectId])
GO

ALTER TABLE [dbo].[Submissions] CHECK CONSTRAINT [FK_Submissions_RepliconProjects]
GO

ALTER TABLE [dbo].[Submissions]  WITH CHECK ADD  CONSTRAINT [FK_Submissions_RepliconUsers] FOREIGN KEY([RepliconManagerApproverId])
REFERENCES [dbo].[RepliconUsers] ([RepliconUserId])
GO

ALTER TABLE [dbo].[Submissions] CHECK CONSTRAINT [FK_Submissions_RepliconUsers]
GO

ALTER TABLE [dbo].[Submissions]  WITH CHECK ADD  CONSTRAINT [FK_Submissions_Status] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO

ALTER TABLE [dbo].[Submissions] CHECK CONSTRAINT [FK_Submissions_Status]
GO




USE [Expense12]
GO

/****** Object:  Table [dbo].[LineItems]    Script Date: 12/22/2014 13:26:12 ******/
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
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [FK_LineItems_ExpenseCategories] FOREIGN KEY([ExpenseCategoryId])
REFERENCES [dbo].[ExpenseCategories] ([ExpenseCategoryId])
GO

ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [FK_LineItems_ExpenseCategories]
GO

ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [FK_LineItems_Status] FOREIGN KEY([StatusId])
REFERENCES [dbo].[Status] ([StatusId])
GO

ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [FK_LineItems_Status]
GO

ALTER TABLE [dbo].[LineItems]  WITH CHECK ADD  CONSTRAINT [FK_LineItems_Submissions] FOREIGN KEY([SubmissionId])
REFERENCES [dbo].[Submissions] ([SubmissionId])
GO

ALTER TABLE [dbo].[LineItems] CHECK CONSTRAINT [FK_LineItems_Submissions]
GO

USE [Expense12]
GO

/****** Object:  Table [dbo].[LineItemComments]    Script Date: 12/22/2014 13:25:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[LineItemComments](
	[LineItemCommentId] [int] IDENTITY(1,1) NOT NULL,
	[LineItemId] [int] NOT NULL,
	[RepliconUserId] [int] NOT NULL,
	[ExpenseComment] [nvarchar](max) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[DateUpdated] [datetime] NOT NULL,
 CONSTRAINT [PK_LineItemComment] PRIMARY KEY CLUSTERED 
(
	[LineItemCommentId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[LineItemComments]  WITH CHECK ADD  CONSTRAINT [FK_LineItemComments_LineItems] FOREIGN KEY([LineItemId])
REFERENCES [dbo].[LineItems] ([LineItemId])
GO

ALTER TABLE [dbo].[LineItemComments] CHECK CONSTRAINT [FK_LineItemComments_LineItems]
GO

ALTER TABLE [dbo].[LineItemComments]  WITH CHECK ADD  CONSTRAINT [FK_LineItemComments_RepliconUsers] FOREIGN KEY([RepliconUserId])
REFERENCES [dbo].[RepliconUsers] ([RepliconUserId])
GO

ALTER TABLE [dbo].[LineItemComments] CHECK CONSTRAINT [FK_LineItemComments_RepliconUsers]
GO

USE [Expense12]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_LineItems_ExpenseCategories]') AND parent_object_id = OBJECT_ID(N'[dbo].[LineItems]'))
ALTER TABLE [dbo].[LineItems] DROP CONSTRAINT [FK_LineItems_ExpenseCategories]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_LineItems_Status]') AND parent_object_id = OBJECT_ID(N'[dbo].[LineItems]'))
ALTER TABLE [dbo].[LineItems] DROP CONSTRAINT [FK_LineItems_Status]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_LineItems_Submissions]') AND parent_object_id = OBJECT_ID(N'[dbo].[LineItems]'))
ALTER TABLE [dbo].[LineItems] DROP CONSTRAINT [FK_LineItems_Submissions]
GO

USE [Expense12]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Submissions]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts] DROP CONSTRAINT [FK_Receipts_Submissions]
GO

USE [Expense12]
GO

/****** Object:  Table [dbo].[Receipts]    Script Date: 12/22/2014 13:26:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Receipts](
	[ReceiptId] [int] IDENTITY(1,1) NOT NULL,
	[SubmissionId] [int] NOT NULL,
	[ReceiptImage] [varbinary](max) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
	[UniqueId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Receipts] PRIMARY KEY CLUSTERED 
(
	[ReceiptId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Receipts]  WITH CHECK ADD  CONSTRAINT [FK_Receipts_Submissions] FOREIGN KEY([SubmissionId])
REFERENCES [dbo].[Submissions] ([SubmissionId])
GO

ALTER TABLE [dbo].[Receipts] CHECK CONSTRAINT [FK_Receipts_Submissions]
GO

USE [expense]
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

USE [expense]
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



