USE [Capstone]
GO

/****** Object:  Table [dbo].[Tasks]    Script Date: 4/14/2020 4:46:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Tasks](
	[taskId] [int] IDENTITY(1,1) NOT NULL,
	[dayId] [int] NOT NULL,
	[category] [varchar](max) NOT NULL,
	[startTime] [datetime] NOT NULL,
	[endTime] [datetime] NULL,
	[minutes] [int] NOT NULL,
	[inProgress] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[taskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD FOREIGN KEY([dayId])
REFERENCES [dbo].[Days] ([dayId])
GO


