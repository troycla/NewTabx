"""
    # Blender 3.0.0
    # Run script inside Blender and select .vox file
"""

import os
import bpy
from bpy_extras.io_utils import ImportHelper


class IMPORT_VOX(bpy.types.Operator, ImportHelper):
    bl_idname = 'voxelbuilder.import_vox'
    bl_label = 'Import From Voxel Builder (.vox)'
    bl_options = {'PRESET', 'UNDO'}
    filename_ext = '.vox'
    filter_glob: bpy.props.StringProperty(default='*.vox', options={'HIDDEN'})
    def execute(self, context):
        create(self.filepath)
        return {'FINISHED'}


def readFile(path):
    data = []
    if os.path.isfile(path):
        with open(path, "r") as f:
            data = f.read().splitlines()
    return data


def create(filePath):
    col = bpy.data.collections.new("Voxels") # create collection(group)
    bpy.context.scene.collection.children.link(col)

    bpy.ops.mesh.primitive_cube_add(size=1) # create original cube
    cube = bpy.context.active_object

    data = readFile(filePath)

    # find unique colors to create materials
    uniqueColors = []
    for voxel in data:
        hex = voxel.split(',')[3]
        if hex not in uniqueColors:
            uniqueColors.append(hex)

    materials = []
    for hex in uniqueColors:
        rgb = tuple(int(hex[i:i + 2], 16) / 255. for i in (1, 3, 5))
        mat = bpy.data.materials.new("voxel_%s" %(hex))
        mat.use_nodes = True
        principled = mat.node_tree.nodes['Principled BSDF']
        principled.inputs['Base Color'].default_value = (rgb[0],rgb[1],rgb[2],1)
        materials.append(mat)

    # recreation
    for voxel in data:
        x = float(voxel.split(',')[0])
        y = float(voxel.split(',')[2])
        z = float(voxel.split(',')[1]) + 0.5
        hex = voxel.split(',')[3]

        # instance original cube
        copy = cube.data.copy()
        obj = bpy.data.objects.new("voxel", copy)
        obj.location = (x, y, z)

        # apply related material
        for mat in materials:
            if mat.name.split('.')[0] == "voxel_%s"%(hex): # compare names
                obj.data.materials.append(mat)

        # add to collection
        bpy.data.collections["Voxels"].objects.link(obj)

    # delete original cube    
    bpy.ops.object.delete()


def register():
    bpy.utils.register_class(IMPORT_VOX)


def unregister():
    bpy.utils.unregister_class(IMPORT_VOX)


if __name__ == "__main__":
    register()
    bpy.ops.voxelbuilder.import_vox('INVOKE_DEFAULT')
