CREATE TABLE [dbo].[Errors](
	[ErrorId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[EndPoint] [varchar](255) NOT NULL,
	[Error] [varchar](255) NOT NULL,
	[DateCreated] [datetime] NOT NULL,
 CONSTRAINT [PK_Errors] PRIMARY KEY CLUSTERED 
(
	[ErrorId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]