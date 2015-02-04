  --Optional to clean up the DB
  delete from [expense12].[dbo].[Receipts]
  delete from [expense12].[dbo].[LineItemComments]
  delete from [expense12].[dbo].[LineItems]
  delete from [expense12].[dbo].[Submissions]
  
 --Required to run the following scripts
  delete from [expense12].[dbo].[RepliconProjects]
  
 --Optional
  delete from [expense12].[dbo].[Submissions]

--Required to adjust the project id keys
ALTER TABLE [expense12].[dbo].[RepliconProjects]
DROP CONSTRAINT [PK_RepliconProject];

delete from [expense12].[dbo].[RepliconProjects]

ALTER TABLE [expense12].[dbo].[RepliconProjects]
DROP COLUMN [RepliconProjectId]

ALTER TABLE [expense12].[dbo].[RepliconProjects]
ADD  [RepliconProjectId] int  not null

ALTER TABLE [expense12].[dbo].[RepliconProjects]
ADD  id int IDENTITY(1,1) not null

ALTER TABLE [expense12].[dbo].[RepliconProjects]
ADD PRIMARY KEY (id)

ALTER table [expense12].[dbo].[Submissions]
ADD IsDeleted bit NOT NULL DEFAULT 0

-- changing fk from lineitemid to submissionid
Delete From [expense12].[dbo].[LineItemComments]

Alter table [expense12].[dbo].[LineItemComments]
drop FK_LineItemComments_LineItems

Alter Table [expense12].[dbo].[LineItemComments]
drop Column LineItemId

Alter Table [expense12].[dbo].[LineItemComments]
Add SubmissionId int not null

ALTER TABLE [expense12].[dbo].[LineItemComments] WITH CHECK ADD
 CONSTRAINT FK_LineItemComments_SubmissionId FOREIGN KEY (SubmissionId) REFERENCES [expense12].[dbo].[Submissions] (SubmissionId)