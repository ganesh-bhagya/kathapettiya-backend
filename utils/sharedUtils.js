

const handleError = (error) => {
  console.error("Error:", error);
  throw new Error(`Error: ${error.message}`);
};



const formatCreatedAt = (createdAt) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const timeDiff = currentDate.getTime() - createdDate.getTime();
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);

  if (daysDiff < 1) {
    if (hoursDiff < 1) {
      return `${minutesDiff} minutes ago`;
    } else {
      return `${hoursDiff} hours ago`;
    }
  } else if (daysDiff < 7) {
    return `${daysDiff} days ago`;
  } else {
    return createdDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
};

const formatStory = (story, baseUrl) => {
  return {
    _id: story._id,
    title: story.title,
    line: story.line,
    content: story.content,
    note: story.note,
    description: story.description,
    moderator_note: story.moderator_note,
    section: story.section,
    time: formatCreatedAt(story.created_at),
    imagePath: story.image,
    imageUrl: `${baseUrl}/${story.image}`,
    user: {
      _id: story.user._id,
      userName: story.user.userName,
    },
    category: {
      _id: story.category._id,
      description: story.category.description,
    },
    series: {
      _id: story.series._id,
      description: story.series.description,
    },
    tags: story.tags.map((tag) => ({
      _id: tag._id,
      description: tag.description,
    })),
  };
};


module.exports = {
  formatCreatedAt,
  formatStory,
  handleError
};
