export default class NoteUtils {
  static getAssignee(notes?: DBNote[]): string | null {
    if (!notes) {
      return null;
    }
    const assignees = notes
      .filter(note => note.subType === "assignee")
      .sort((a, b) => {
        return (
          new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
        );
      });
    if (assignees.length === 0) {
      return null;
    }
    return assignees[0].content;
  }
}
