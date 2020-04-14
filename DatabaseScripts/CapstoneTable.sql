USE [Capstone]
GO

/****** Object:  Table [dbo].[Capstones]    Script Date: 4/14/2020 4:46:58 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Capstones](
	[capstoneId] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NOT NULL,
	[name] [varchar](max) NOT NULL,
	[description] [varchar](max) NOT NULL,
	[totalMinutesWorked] [int] NOT NULL,
	[totalMinutesBusy] [int] NOT NULL,
	[totalMinutesSleep] [int] NOT NULL,
	[totalMinutesFun] [int] NOT NULL,
	[meetingDay] [varchar](max) NOT NULL,
	[hoursPerWeek] [int] NOT NULL,
	[daysPerWeek] [int] NULL,
	[startDate] [date] NOT NULL,
	[endDate] [date] NOT NULL,
	[onTrack] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[capstoneId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Capstones]  WITH CHECK ADD FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([userId])
GO


