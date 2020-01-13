export default class NoteUtils {
  private static timestampDESC(a: Note, b: Note) {
    return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf();
  }
  static getFollowUp(notes: Note[] | undefined, subtype: SubType): Note | null {
    if (!notes) {
      return null;
    }
    const notesOfSubtype = notes
      .filter(note => note.subType === subtype)
      .sort(NoteUtils.timestampDESC);

    const followUp = notesOfSubtype[0];
    return followUp ? followUp : null;
  }
}
