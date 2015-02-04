USE [expense12]
GO

/****** Object:  Table [dbo].[RepliconUserProjects]    Script Date: 01/05/2015 11:10:16 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RepliconUserProjects]') AND type in (N'U'))
DROP TABLE [dbo].[RepliconUserProjects]
GO

USE [expense12]
GO

/****** Object:  Table [dbo].[RepliconUserProjects]    Script Date: 01/05/2015 11:10:16 ******/
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
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO


--Remove project constraint because the ids are not the same from replicon.
ALTER TABLE [expense12].[dbo].[Submissions]
DROP CONSTRAINT FK_SUBMISSIONS_REPLICONPROJECTS

--Add The Test User
  Insert into [expense12].[dbo].[RepliconUsers]( [RepliconUserName]
      ,[FinanceApprover]) VALUES('catexpuser' ,0)
	  
	  
--Make catexpUser an manager
update [expense12].[dbo].[Submissions]
  set RepliconManagerApproverId = (select RepliconUserId 
								  from [expense12].[dbo].[RepliconUsers] 
								  where RepliconUserName = 'catexpuser')
								  
  where RepliconManagerApproverId IN(select RepliconUserId 
								  from [expense12].[dbo].[RepliconUsers] 
								  where RepliconUserName = 'dpinkler')
								  
--reverse the changes
update [expense12].[dbo].[Submissions]
  set RepliconManagerApproverId = (select RepliconUserId 
								  from [expense12].[dbo].[RepliconUsers] 
								  where RepliconUserName = 'dpinkler')
								  
  where RepliconManagerApproverId IN(select RepliconUserId 
								  from [expense12].[dbo].[RepliconUsers] 
								  where RepliconUserName = 'catexpuser')
								  
--Make test user a finance approver
	update [expense12].[dbo].[RepliconUsers]
    set [FinanceApprover] = 1
    where [RepliconUserName] = 'catexpuser';
	
--Make the test user a non finance approver
	update [expense12].[dbo].[RepliconUsers]
    set [FinanceApprover] = 0
    where [RepliconUserName] = 'catexpuser';


 ALTER TABLE [expense12].[dbo].[Submissions]
 ADD ManagerName VARCHAR(255)

 update [expense12].[dbo].[Submissions] 
 set ManagerName = (select RepliconUserName from [expense12].[dbo].RepliconUsers
 where RepliconUserId = [RepliconManagerApproverId])

ALTER TABLE [expense12].[dbo].[Submissions]
DROP CONSTRAINT FK_Submissions_RepliconUsers

ALTER TABLE [expense12].[dbo].[Submissions]
DROP COLUMN [RepliconManagerApproverId]

USE [expense12]
GO

IF  EXISTS (SELECT * FROM sys.foreign_keys WHERE object_id = OBJECT_ID(N'[dbo].[FK_Receipts_Receipts]') AND parent_object_id = OBJECT_ID(N'[dbo].[Receipts]'))
ALTER TABLE [dbo].[Receipts] DROP CONSTRAINT [FK_Receipts_Receipts]
GO

USE [expense12]
GO

/****** Object:  Table [dbo].[Receipts]    Script Date: 01/12/2015 14:16:19 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Receipts]') AND type in (N'U'))
DROP TABLE [dbo].[Receipts]
GO

USE [expense12]
GO

/****** Object:  Table [dbo].[Receipts]    Script Date: 01/12/2015 14:16:19 ******/
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
	[Name] [varchar](255) NULL,
	[Type] [varchar](255) NULL,
	[DateCreated] [datetime] NOT NULL,
 CONSTRAINT [PK_Receipts] PRIMARY KEY CLUSTERED 
(
	[ReceiptId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Receipts]  WITH CHECK ADD  CONSTRAINT [FK_Receipts_Receipts] FOREIGN KEY([SubmissionId])
REFERENCES [dbo].[Submissions] ([SubmissionId])
GO

ALTER TABLE [dbo].[Receipts] CHECK CONSTRAINT [FK_Receipts_Receipts]
GO



